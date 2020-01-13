import Mime from 'mime-types'

function AttributeBoolean(key) {
  return function() {
    return ['', true, 'true'].includes(this.$attrs[key])
  }
}

function BytesToSize(bytes) {
  let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function IsAccepted(file, accept) {
  if (!accept) return true
  return accept.split(',').some(v => {
    if (v.startsWith('.')) {
      let type = Mime.lookup(v)
      return type === file.type
    }
    if (v.includes('*')) return file.type.startsWith(v.replace('*', ''))
    return file.type === v
  })
}

function Clone(val) {
  return JSON.parse(JSON.stringify(val))
}

export { AttributeBoolean, BytesToSize, Clone, IsAccepted }
