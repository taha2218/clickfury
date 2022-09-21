import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectCategoriesMap } from '../../../store/categories/categories.selector';
import ProductCard from '../../product-card/product-card.component';
import './category.styles.scss';

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);  
    const [products, setProducts] = useState(categoriesMap[category]);
    
    

    useEffect(
        () =>{
            setProducts(categoriesMap[category])
        }
    , [category, categoriesMap])

    return (
        <div className='category-container'>
            {
                products &&
                products.map(
                    (product) => (<ProductCard key={product.id} product = {product} />)
                )
            }
        </div>
    )
}

export default Category;