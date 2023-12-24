const BreadCrumb = () => {
  return (
    <ol
      className='flex items-center whitespace-nowrap'
      aria-label='Breadcrumb'>
      <li className='inline-flex items-center'>
        <a className='flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:focus:text-blue-500'>
          Przedmiot
        </a>
      </li>
    </ol>
  );
};

export default BreadCrumb;
