export default function download(file: BlobPart, name?: string): void {
  const url = URL.createObjectURL(new Blob([file]))
  const dl = document.createElement('a')
  dl.download = name || 'archive-' + new Date().toLocaleString().split(', ').join('-') + '.zip'
  dl.href = url
  dl.click()
  URL.revokeObjectURL(url)
}
