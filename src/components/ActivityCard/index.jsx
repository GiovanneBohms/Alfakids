import "./index.css"

export function ActivityCard({ activity, isRepository }){

    if(isRepository){
        return (
            <div className="activityCardContainerRepository">
                <div className="activityContentSection">
                    <div className="activityTitle">
                        <p>{activity.title}</p>
                    </div>
                    <div className="activityInfo">
                        <p>Matéria: {activity.subject_name}</p>
                        <p>Professor: {activity.professor_name}</p>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="activityCardContainer">
                <div className="activityContentSection">
                    <div className="activityTitle">
                        <p>{activity.title}</p>
                    </div>
                    <div className="activityInfo">
                        <p>Matéria: {activity.subject_name}</p>
                        <p>Professor: {activity.professor_name}</p>
                    </div>
                </div>
            </div>
        )
    }
}