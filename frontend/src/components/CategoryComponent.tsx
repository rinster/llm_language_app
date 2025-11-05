import React, {useEffect, useState} from "react";
import {listCategories, type Categories } from "../services/CategoriesService.ts";
import {Link} from "react-router-dom";

const CategoryComponent: React.FC = () => {
    const [categories, setCategories] = useState<Categories[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await listCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

  return (
    <>
        <div className="container container-llmApp">
            <div className="panel panel-default">
                <h2 className="panel-heading">Categories</h2>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div className="card text-center mb-2" style={{width: '18rem;'}} key={category.id}>
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                                <Link to={`/flashcards/${category.id}`}>
                                    <a className="btn btn-tertiary-custom px-3 py-2">Start Lesson</a>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (<span>No Data Found</span>)}
            </div>
        </div>
    </>
  );
};

export default CategoryComponent;
