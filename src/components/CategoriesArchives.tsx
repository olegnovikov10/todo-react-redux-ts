import React, {FC} from 'react';

interface ICatArchives {
    names: string,
    category: string,
    content: string,
    id: number,
    unArchive: (id) => void
}

const CategoriesArchives: FC<ICatArchives> = ({category, names, id, content, unArchive}) => {
    return (
        <div className="content__item">
            <div className="content__name"> {names} </div>
            <div className="content__name"> {category} </div>
            <div className="content__name"> {content} </div>
            <div className="content__name">
                <span className="material-icons links" onClick={() => {
                    unArchive(id)
                }}>unarchive</span>
            </div>
        </div>
    );
};

export default CategoriesArchives;