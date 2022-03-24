import { Fragment, FunctionComponent, useEffect, useState } from "react"
import { useParams } from "react-router"
import Performance from "../../components/Performance"
import Activity from "../../components/Activity"
import AverageSessions from "../../components/AverageSessions"
import API from "../../services/API"
import { Iactivity } from "../../types/Iactivity"
import { IsessionAverage } from "../../types/IaverageSessions"
import { Iuser } from "../../types/Iuser"
import { IuserPerformance } from "../../types/IuserPerformance"
import './style.scss'

const Profile: FunctionComponent = () => {
  const { userId } = useParams<string>()
  const [ errorAPI, setErrorAPI ] = useState<number>(200)
  // const [isLoading, setIsLoading] = useState<boolean>(true)

  const [userData, setUserData] = useState<Iuser>()
  const [userActivity, setUserActivity] = useState<Iactivity>()
  const [userAverageSessions, setUserAverageSessions] = useState<IsessionAverage>()
  const [userPerformances, setUserPerformances] = useState<IuserPerformance>()

  // Calls API
  useEffect(() => {
    const callApi = async () => {
      try { 
        setUserData( await API.getUserData(userId!) )
        setUserActivity( await API.getUserActivity(userId!) )
        setUserAverageSessions( await API.getUserAverageSessions(userId!) )
        setUserPerformances( await API.getUserPerformances(userId!) )
      }
      catch (err: any) { 
        console.error(err.message)
        setErrorAPI(err.status)
      }
    }
    callApi()    
  }, [userId])

  if(errorAPI === 500) {
    return (
      <Fragment>
        <h1>Erreur Serveur</h1>
        <h2 className="text--primary">Une erreur c'est produite lors de la récupération des données</h2>
        <p>Si le problème persiste, veuillez contacter l'administrateur du site.</p>
      </Fragment>
    )
  }

  if(errorAPI === 404) {
    return (
      <Fragment>
        <h1>Regiriger vers la page 404</h1>
      </Fragment>
    )
  }

  return (
    <section className="profile flex flex__column">
      <h1>Bonjour <span className="text--primary">{ userData?.userInfos.firstName }</span></h1>
      <h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
      <div className="profile__stats flex flex__row flex__item">
        <div className="flex flex__column flex__item">
          <Activity />
          <AverageSessions />
        </div>
        <div className="profile__performance flex__item">
          <Performance />
        </div>        
      </div>
    </section>
  );
}

export default Profile
