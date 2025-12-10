import './CategoriesPage.scss';
import CategoryHeader from "../../components/CategoryHeader/CategoryHeader.tsx";
import CategoriesDataGrid from "../../components/CategoryTable/CategoriesDataGrid.tsx";
import {TEXT} from "../../constants/textConstants.ts";

function CategoriesPage() {
    return (
        <div className={'categories-wrapper'}>
            <h1>{TEXT.TITLES.CATEGORIES_PAGE}</h1>
            <CategoryHeader />
            <CategoriesDataGrid />
        </div>
    );
}

export default CategoriesPage;