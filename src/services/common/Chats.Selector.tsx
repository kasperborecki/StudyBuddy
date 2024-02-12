import supabase from "../../config/SupabaseClient";

// get all curen user chats

const getAllUserChats = async (userId: any) => {
  try {
    const { data: chatsData, error: chatsError } = await supabase
      .from('chats')
      .select('id, first_participant, second_participant, background_style')
      .or(`first_participant.eq.${userId},second_participant.eq.${userId}`);

    if (chatsError) {
      console.error(chatsError.message);
      throw chatsError.message;
    }

    if (!chatsData || chatsData.length === 0) {
      return [];
    }

    const userIds = chatsData.map((chats: any) => {
      if (chats.first_participant === userId) {
        return chats.second_participant;
      } else {
        return chats.first_participant;
      }
    });

    const { data: unReadCountData, error: unReadCountError } = await supabase
    .from('messages')
    .select('is_read, user_id, context')
    .in('user_id', userIds)
    .eq('is_read', false);
  
  if (unReadCountError) {
    console.error(unReadCountError.message);
    throw unReadCountError.message;
  }

  const countUnReadMessages = unReadCountData.length;

    const { data: lastMessageData, error: lastMessageError } = await supabase
      .from('messages')
      .select('context, user_id, delivered_date')
      .in('user_id', userIds)
      .order('delivered_date', { ascending: false })
      .limit(1);

    if (lastMessageError) {
      console.error(lastMessageError.message);
      throw lastMessageError.message;
    }

    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id, name, avatar_url')
      .in('user_id', userIds);

    if (profilesError) {
      console.error(profilesError.message);
      throw profilesError.message;
    }

    const combinedData = chatsData.map((chats) => {
        const matchingProfile = profilesData.find(
          (profile) =>
            profile.user_id ===
            (chats.first_participant === userId
              ? chats.second_participant
              : chats.first_participant)
        );
      
        const matchingUnReadCount = unReadCountData.filter(
            (unread) => unread.user_id === matchingProfile?.user_id
        ) || [];        
      
        const matchingLastMessage = lastMessageData.find(
          (message) => message.user_id === matchingProfile?.user_id
        );
      
        return {
          ...chats,
          profile: matchingProfile,
          un_read_messages: matchingUnReadCount,
          last_message: matchingLastMessage,
        };
      });

    return combinedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get all curent chat messages

const getAllCurentChatMsg = async (chatId: any) => {
  const { data, error } = await supabase
    .from('messages')
    .select('message_id, chat_id, user_id, delivered_date, is_read, context')
    .order('delivered_date', { ascending: false })
    .eq('chat_id', chatId);

  if (error) throw error.message;
  return data || [];
};

// get chat background styleing

const getChatStyle = async (chatId: any): Promise<string> => {
  const { data, error } = await supabase
    .from('chats')
    .select('background_style')
    .eq('id', chatId)
    .single();
  
  if (error) throw error.message;
  return data?.background_style || '';
};


// create new message

const addNewMessage = async (newData: string, userId: any, chatId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        chat_id: chatId,
        user_id: userId,
        context: newData,
      },
    ])
    .select('message_id');


  if (error) throw error.message;
};

const checkTheme = async (chatId: string) => {
  const { data, error } = await supabase
    .from('chats')
    .select('background_style');
    // .eq('id', chatId);


  if (error) throw error.message;
};


const ChatsData = {
  getAllUserChats,
  getAllCurentChatMsg,
  getChatStyle,
  addNewMessage,
  checkTheme,
};

export default ChatsData;