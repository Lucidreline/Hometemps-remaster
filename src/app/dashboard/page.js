import Header from "../components/Header/Header";
import LocationCardList from "../components/LocationCardList/LocationCardList";

export default function Page({ data }) {
    return <div>
        <Header />
        <LocationCardList data={data} />
    </div>
}