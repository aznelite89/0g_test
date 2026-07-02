import './SearchBar.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <label htmlFor="task-search" className="search-bar__label">
        Search tasks
      </label>
      <input
        id="task-search"
        type="search"
        className="search-bar__input"
        placeholder="Filter by title..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
