import './App.css'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Angel Duran',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo Heraldo',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdezs',
    isFollowing: false
  },
  {
    userName: 'TMchein',
    name: 'Tomas',
    isFollowing: false
  }
]
export function App () {
  return (
    <section className='App'>
      {
                users.map(({ userName, name, isFollowing }) => (
                  <TwitterFollowCard
                    key={userName}
                    userName={userName}
                    initialIsFollowing={isFollowing}
                  >
                    {name}
                  </TwitterFollowCard>
                ))
            }

    </section>
  )
}
