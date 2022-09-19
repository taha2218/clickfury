import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import CategoryPreview from "../../category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    < >
        {
            Object.keys(categoriesMap).map(
                (title) => {
                    const products = categoriesMap[title];

                    return <CategoryPreview key={title} title={title} products={products} />
                }
            )
        }
    </ >
  );
};

export default CategoriesPreview;
