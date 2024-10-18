// Utils
import useStore from "@/store";

// Components
import Button from "@/components/atoms/Button";

// Styles
import "./Post.scss";

// Utils
import { findCategory } from "@/utils";

// Types
import { type Post } from "@/store";

// Helpers
const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const parseDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const day = date.getDate();
  const dayWithSuffix = day + getOrdinalSuffix(day);

  const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "long", year: "numeric", month: "long" }).format(
    date
  );

  return `${formattedDate.split(" ")[2]}, ${formattedDate.split(" ")[0]} ${dayWithSuffix} ${formattedDate.split(" ")[1]}`;
};

function Post({ id, date, description, categories: postCategories }: Post) {
  const { categories, selectedCategory } = useStore((state) => state);

  return (
    <div
      className="post"
      id={id}>
      <span className="date">{parseDate(date)}</span>
      <p className="description">{description}</p>
      <div className="post-categories">
        {!!postCategories.length &&
          postCategories.map((categoryId) => {
            const category = findCategory(categories, categoryId);
            if (category) {
              return (
                <Button
                  id={categoryId}
                  key={categoryId}
                  text={category.name}
                  isFavorite={category.favorite}
                  isSelected={selectedCategory === categoryId}
                  onClick={() => {}}
                />
              );
            }
          })}
      </div>
    </div>
  );
}

export default Post;
