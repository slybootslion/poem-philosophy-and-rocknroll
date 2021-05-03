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
}

const storageCache = new StorageCache()

export { storageCache }
