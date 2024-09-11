export function getStorage() {
    const data = localStorage.getItem('data')
    
    if(data != null) {
      return JSON.parse(data)
    }
}

export function getStorageWorkspace() {
  const data = localStorage.getItem('workpace')
  
  if(data != null) {
    return JSON.parse(data)
  }
}

export function getStorageDisplay() {
  const data = localStorage.getItem('display')
  
  if(data != null) {
    return JSON.parse(data)
  }
}

export function getStorageTask() {
  const data = localStorage.getItem('task')
  
  if(data != null) {
    return JSON.parse(data)
  }
}
  