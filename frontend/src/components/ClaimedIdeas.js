import React from 'react'

const ClaimedIdeas = ({ claimedIdeas }) => {
  return (
    <div>
      <h2>Claimed Ideas</h2>
      <ul>
        {claimedIdeas.map((idea) => (
          <li key={idea._id}>{idea.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default ClaimedIdeas;
