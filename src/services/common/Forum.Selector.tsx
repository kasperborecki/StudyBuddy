import supabase from "../../config/SupabaseClient";

const getAllPosts = async (subjectId: string) => {
  const { data, error } = await supabase
    .from("forum_posts")
    .select(
      "forum_post_id, created_at, tittle, user_id, views, subject_id, likes, description"
    )
    .eq("subject_id", subjectId);

  if (error) throw error.message;

  return data || null;
};

const ForumData = {
  getAllPosts,
};

export default ForumData;
