import './docteurList.css'
import {Link, useNavigate} from 'react-router-dom'

const DocteurList = ({docteur}) => {
  const navigate = useNavigate();

  return (
    <>
        <Link className="docteurList" to={`/docteur/book-rdv/${docteur._id}`}>
            <div className="docteur-header">
              Dr. <span className="docteur-span">{docteur.firstname} {docteur.lastname}</span>
            </div>
            <div className="docteur-body">
              <p className="docteur-desc">
                <b>Specialisation :</b> {docteur.specialisation}
              </p>
              <p className="docteur-desc">
                <b>Experience :</b> {docteur.experience}
              </p>
              <p className="docteur-desc">
                <b>Frais par indemnisation :</b> {docteur.feesPerCunsaltation}
              </p>
              <p className="docteur-desc">
                <b>Horaires :</b> {docteur.timings[0]} - {docteur.timings[1]}
              </p>
            </div>
        </Link>
    </>
  )
}

export default DocteurList