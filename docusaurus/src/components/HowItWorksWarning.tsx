import React from 'react'
export const PIXSTORE_VERSION =
  require('../../package.json')['pixstore-version'] || ' '

const HowItWorksWarning: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: '#fff4e5',
        padding: '1em',
        borderLeft: '4px solid #f5a623',
        marginBottom: '1em',
        borderRadius: '4px',
        fontSize: '0.8em',
        lineHeight: '1.4',
        color: '#333',
      }}
    >
      <strong>⚠️ This section shows internal implementation details.</strong>
      <br />
      It is intended for contributors or users who want to understand the inner
      workings of Pixstore. Typical users do not need to modify or interact with
      this code directly.
      <br />
      <em>
        Also, this code was last verified with
        <b> Pixstore v{PIXSTORE_VERSION}</b> and may change in future versions.
        For the latest implementation, always check the official repository at{' '}
        <a
          href="https://github.com/sDenizOzturk/pixstore"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/sDenizOzturk/pixstore
        </a>
        .
      </em>
    </div>
  )
}

export default HowItWorksWarning
