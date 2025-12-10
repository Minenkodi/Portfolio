import './CategoriesPage.scss';
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader.tsx";
import CategoriesDataGrid from "../../components/CategoryTable/CategoriesDataGrid.tsx";

function CategoriesPage() {
    return (
        <div className={'categories-wrapper'}>
            <h1>Categories</h1>
            <CategoryHeader />
            {/*<CategoryTable2 />*/}
            <CategoriesDataGrid />
        </div>
    );
}

export default CategoriesPage;