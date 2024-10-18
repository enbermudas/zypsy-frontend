// Vendor
import { useEffect } from "react";

// Utils
import useStore from "@/store";

// Components
import Sidebar from "@/components/organisms/Sidebar";
import Posts from "@/components/organisms/Posts";

// Styles
import "./App.scss";

function App() {
  const { fetchCategories, selectedCategory, fetchPosts } = useStore((state) => state);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCategory !== "") {
      fetchPosts(selectedCategory);
    }
  }, [fetchPosts, selectedCategory]);

  return (
    <div className="app">
      <Sidebar />
      <Posts />
    </div>
  );
}

export default App;
