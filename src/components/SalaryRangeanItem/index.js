import './index.css'

const SalaryRangeItem = props => {
  const {salaryRangeItemDetails, onSalaryStatusChange} = props
  const {label, salaryRangeId} = salaryRangeItemDetails
  const onChangeInput = () => {
    onSalaryStatusChange(salaryRangeId)
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

export default SalaryRangeItem
