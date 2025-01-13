const CategoryList = ({ categories, activeCategory, handleClick }) => (
    <ul className="flex flex-wrap gap-2 mt-2">
      <li
        onClick={() => handleClick('all')}
        className={`cursor-pointer ${activeCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} px-4 py-2 rounded-lg`}
      >
        all
      </li>
      {categories.map((category, index) => (
        <li
          key={index}
          onClick={() => handleClick(category)}
          className={`cursor-pointer ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} px-4 py-2 rounded-lg`}
        >
          {category}
        </li>
      ))}
    </ul>
);

export default CategoryList;