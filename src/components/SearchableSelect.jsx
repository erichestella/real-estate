import { useEffect, useMemo, useRef, useState } from 'react'
import './SearchableSelect.css'

// A text input that behaves like a <select>, but lets you type to filter
// down the list of options live — e.g. typing part of a name only shows
// matching entries instead of the full list.
function SearchableSelect({ id, value, onChange, options, placeholder = 'Any' }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const wrapperRef = useRef(null)

  // When not actively editing, the box just shows whatever is selected
  // (or the placeholder if nothing is). Typing starts a fresh search.
  const displayValue = isOpen ? query : value || ''

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((option) => option.toLowerCase().includes(q))
  }, [options, query])

  useEffect(() => {
    if (!isOpen) return
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [isOpen])

  const selectOption = (option) => {
    onChange(option)
    setQuery('')
    setIsOpen(false)
  }

  const handleFocus = () => {
    setQuery('')
    setIsOpen(true)
    setHighlight(0)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    setIsOpen(true)
    setHighlight(0)
  }

  const handleKeyDown = (e) => {
    if (!isOpen) return
    const list = ['', ...filtered] // '' represents the "Any" row

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, list.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      selectOption(list[highlight])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
    }
  }

  return (
    <div className="searchable-select" ref={wrapperRef}>
      <input
        id={id}
        type="text"
        className="searchable-select__input"
        value={displayValue}
        placeholder={placeholder}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
      />
      <i className="searchable-select__chevron fa-solid fa-chevron-down" aria-hidden="true"></i>

      {isOpen && (
        <ul className="searchable-select__menu" id={`${id}-listbox`} role="listbox">
          <li
            role="option"
            aria-selected={value === ''}
            className={`searchable-select__option${highlight === 0 ? ' is-highlighted' : ''}`}
            onMouseDown={() => selectOption('')}
            onMouseEnter={() => setHighlight(0)}
          >
            {placeholder}
          </li>

          {filtered.length === 0 && (
            <li className="searchable-select__empty">No matches</li>
          )}

          {filtered.map((option, i) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              className={`searchable-select__option${highlight === i + 1 ? ' is-highlighted' : ''}${value === option ? ' is-selected' : ''}`}
              onMouseDown={() => selectOption(option)}
              onMouseEnter={() => setHighlight(i + 1)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchableSelect