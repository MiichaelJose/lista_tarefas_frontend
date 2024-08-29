export function getStorage() {
    const data = localStorage.getItem('data')
    
    if(data != null) {
      return JSON.parse(data)
    }
}
  