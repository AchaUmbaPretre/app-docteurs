import './docteurList.css'
import {useNavigate} from 'react-router-dom'

const DocteurList = ({docteur}) => {
  const navigate = useNavigate();

  return (
    <>
        <div className="docteurList" onClick={navigate(`/docteur/book-rdv/${1}`)}>
            <div className="docteur-header">
              Dr. <span className="docteur-span">Ndambi umba</span>
            </div>
            <div className="docteur-body">
              <p className="docteur-desc">
                <b>Specialisation :</b> dental
              </p>
              <p className="docteur-desc">
                <b>Experience :</b> 5
              </p>
              <p className="docteur-desc">
                <b>Fees Per Cunsaltation :</b> 500
              </p>
              <p className="docteur-desc">
                <b>Timings :</b> 07:00 -  12:00
              </p>
            </div>
        </div>
    </>
  )
}

export default DocteurList