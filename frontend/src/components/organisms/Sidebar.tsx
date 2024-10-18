// Vendor
import { useState, useEffect } from "react";

// Utils
import useStore from "@/store";

// Components
import Button from "@/components/atoms/Button";
import RadioButton from "@/components/atoms/RadioButton";

// Styles
import "./Sidebar.scss";

// Types
import { Category } from "@/store";

function Sidebar() {
  const { categories, selectedCategory, selectedFilter, selectFilter, selectCategory } = useStore((state) => state);

  const [renderableCategories, setRenderableCategories] = useState<Array<Category>>(categories);

  useEffect(() => {
    if (selectedFilter === "favorite") setRenderableCategories(categories.filter((category) => category.favorite));
    else setRenderableCategories(categories);
  }, [categories, selectedFilter]);

  return (
    <div className="sidebar">
      <div className="header">Posts</div>

      <div className="selection">
        <RadioButton
          name="categories"
          value="all"
          label="All categories"
          checked={selectedFilter == "all"}
          onClick={() => selectFilter("all")}
        />

        <RadioButton
          name="categories"
          value="favorite"
          label="Favorite categories"
          checked={selectedFilter == "favorite"}
          onClick={() => selectFilter("favorite")}
        />
      </div>

      <div className="categories">
        {!!renderableCategories.length &&
          renderableCategories.map(({ id, name, favorite }) => (
            <Button
              key={id}
              id={id}
              text={name}
              isFavorite={favorite}
              isSelected={selectedCategory === id}
              onClick={selectCategory}
            />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
