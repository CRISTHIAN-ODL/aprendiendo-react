import { useState } from 'react'
export function TwitterFollowCard ({ children, userName, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  console.log('[TwitterFollowCard] render with userName: ', userName)

  const text = isFollowing ? 'Siguiendo' : 'Seguir'
  const buttonClassName = isFollowing
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

  const handlerclick = () => {
    setIsFollowing(!isFollowing)
  }

  console.log(isFollowing)
  const imageSrc = `https://unavatar.io/${userName}`
  return (
    <article className='tw-followCard'>
      <header className='tw-followCard-header'>
        <img
          className='tw-followCard-avatar'
          alt='El avatar de midudev'
          src={imageSrc}
        />
        <div className='tw-followCard-info'>
          <strong>{children}</strong>
          <span
            className='tw-followCard-infoUserName'
          >@{userName}
          </span>
        </div>
      </header>
      <aside>
        <button className={buttonClassName} onClick={handlerclick}>
          <span className='tw-followCard-text'>{text}</span>
          <span className='tw-followCard-stopFollow'>Dejar de Seguir</span>
        </button>
      </aside>
    </article>
  )
}
