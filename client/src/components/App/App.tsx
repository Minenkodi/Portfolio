import './App.scss'
import Header from "../Header/Header.tsx";
import Content from "../Content/Content.tsx";
import {Provider} from "react-redux";
import {store} from "../../store/store.ts";
import AppModal from "../AppModal/AppModal.tsx";

function App() {

    return (
        <Provider store={store}>
            <Header/>
            <AppModal/>
            <Content/>
        </Provider>
    )
}

export default App
