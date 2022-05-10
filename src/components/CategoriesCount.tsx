import React, {FC} from 'react';

interface ICategories {
    category: string,
    active: number,
    archive: number
}

const CategoriesCount: FC<ICategories> = ({archive, category, active}) => {
    return (
        <div className="category__items">
            <div className="category__item">{category}</div>
            <div className="category__item">{active}</div>
            <div className="category__item">{archive}</div>
        </div>

    );
};

export default CategoriesCount;