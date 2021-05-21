import WebStorageCache from 'web-storage-cache'

class StorageCache extends WebStorageCache {
  setUuid (uuid) {
    this.set('uuid', uuid)
  }

  getUuid () {
    return this.get('uuid')
  }

  removeUuid () {
    this.delete('uuid')
  }

  setQRCode (qrcodeStr) {
    this.set('qrcode', qrcodeStr, { exp: 60 * 3 })
  }

  getQRCode () {
    return this.get('qrcode')
  }

  removeQRCode () {
    this.delete('qrcode')
  }

  unshiftSearchHistoryItem (str, force = false) {
    let arr = this.getSearchHistory() || []
    if (arr.length && arr.includes(str)) {
      arr = arr.filter(item => item !== str)
      if (force) {
        this.set('searchHistory', arr)
        return
      }
    }
    arr.unshift(str)
    this.set('searchHistory', arr)
  }

  getSearchHistory () {
    return this.get('searchHistory')
  }
}

const storageCache = new StorageCache()

export { storageCache }
