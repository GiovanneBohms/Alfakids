import "./index.css"

export function ActivityCard({activity}){
    return (
        <div className="activityCardContainer">
            <div className="activityTitle">
                <p>{activity.title}</p>
            </div>
            <div className="activityInfo">
                <p>Status: {activity.status}</p>
                <p>Professor: {activity.id_professor}</p>
            </div>
        </div>
    )
}