import React from 'react'
import ReactLoading from 'react-loading';

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const FullPageLoader = () => (
  <div style={styles.container}>
    <ReactLoading type="spin" color="cyan" height={30} width={30} />
  </div>
)

export default FullPageLoader
