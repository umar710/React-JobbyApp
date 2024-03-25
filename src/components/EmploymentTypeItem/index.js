import './index.css'

const EmploymentTypeItem = props => {
  const {employmentTypeItemDetails, onEmployementStatus} = props
  const {label, employmentTypeId} = employmentTypeItemDetails
  const onChangeInput = () => {
    onEmployementStatus(employmentTypeId)
  }
  return (
    <li>
      <div>
        <input type="checkbox" id="checkBox" onChange={onChangeInput} />
        <label htmlFor="checkBox" className="label">
          {label}
        </label>
      </div>
    </li>
  )
}

export default EmploymentTypeItem
