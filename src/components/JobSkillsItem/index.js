import './index.css'

const JobSkillsItem = props => {
  const {jobSkillsItemDetails} = props
  const {name, imageUrl} = jobSkillsItemDetails
  return (
    <li>
      <div className="skills-card">
        <img src={imageUrl} alt={name} className="skill-logo" />
        <p>{name}</p>
      </div>
    </li>
  )
}

export default JobSkillsItem
