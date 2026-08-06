import { useEffect, useMemo, useRef, useState } from 'react'
import './FilterDropdown.css'

// Pill-shaped filter button that expands into a panel: a search box up
// top to narrow the list, a scrollable radio list of options, and a
// "View N results" button at the bottom to confirm/close.
function FilterDropdown({ label, buttonLabel, value, onChange, options, resultCount }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapperRef = useRef(null)
  const searchRef = useRef(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((option) => option.toLowerCase().includes(q))
  }, [options, query])

  useEffect(() => {
    if (!isOpen) return
    searchRef.current?.focus()

    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
        setQuery('')
      }
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const togglePanel = () => {
    setIsOpen((open) => !open)
    setQuery('')
  }

  const selectOption = (option) => {
    onChange(option)
  }

  const closePanel = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div className="filter-pill" ref={wrapperRef}>
      <button
        type="button"
        className={`filter-pill__toggle${value ? ' has-value' : ''}${isOpen ? ' is-open' : ''}`}
        onClick={togglePanel}
      >
        {value || buttonLabel || label}
        <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} aria-hidden="true"></i>
      </button>

      {isOpen && (
        <div className="filter-pill__panel">
          <div className="filter-pill__search">
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}`}
            />
          </div>

          <ul className="filter-pill__options">
            <li>
              <label className="filter-pill__option">
                <input
                  type="radio"
                  name={`filter-${label}`}
                  checked={value === ''}
                  onChange={() => selectOption('')}
                />
                <span className="filter-pill__radio" aria-hidden="true"></span>
                All
              </label>
            </li>

            {filtered.map((option) => (
              <li key={option}>
                <label className="filter-pill__option">
                  <input
                    type="radio"
                    name={`filter-${label}`}
                    checked={value === option}
                    onChange={() => selectOption(option)}
                  />
                  <span className="filter-pill__radio" aria-hidden="true"></span>
                  {option}
                </label>
              </li>
            ))}

            {filtered.length === 0 && (
              <li className="filter-pill__empty">No matches</li>
            )}
          </ul>

          <button type="button" className="filter-pill__apply" onClick={closePanel}>
            View {resultCount} result{resultCount === 1 ? '' : 's'}
          </button>
        </div>
      )}
    </div>
  )
}

export default FilterDropdown