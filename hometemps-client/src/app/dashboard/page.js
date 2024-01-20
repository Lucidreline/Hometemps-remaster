import LocationCardList from "../components/LocationCardList/LocationCardList";

export default function Page({ data }) {
    return <div>
        <LocationCardList data={data} />
    </div>
}