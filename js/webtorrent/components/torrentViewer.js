const React = require('react')

// Components
const Button = require('../../components/button')
const TorrentFileList = require('./torrentFileList')
const TorrentStatus = require('./torrentStatus')

class TorrentViewer extends React.Component {
  constructor () {
    super()
    this.state = {} // Needed for SortableTable.stateOwner
  }

  render () {
    const {
      name,
      torrentId,
      torrent,
      serverUrl,
      errorMessage,
      torrentIdProtocol,
      dispatch
    } = this.props

    let titleElem, mainButton, saveButton, legalNotice

    if (torrent) {
      if (name) {
        // No localization, just use the torrent name
        titleElem = <div className='sectionTitle'>{name}</div>
      } else {
        // 'Loading torrent information...'
        titleElem = (
          <div
            className='sectionTitle'
            data-l10n-id='torrentLoadingInfo'
          />
        )
      }
      mainButton = (
        <Button
          l10nId='stopDownload'
          className='primaryButton mainButton'
          onClick={() => dispatch('stop')}
        />
      )
      legalNotice = (
        <a
          className='legalNotice'
          data-l10n-id='poweredByWebTorrent'
          href='https://webtorrent.io'
          target='_blank'
        />
      )
    } else {
      const l10nStart = name ? 'startPrompt' : 'startPromptUntitled'
      const l10nArgs = {name}
      titleElem = (
        <div
          data-l10n-id={l10nStart}
          data-l10n-args={JSON.stringify(l10nArgs)}
          className='sectionTitle' />
      )
      mainButton = (
        <Button
          l10nId='startDownload'
          className='primaryButton mainButton'
          onClick={() => dispatch('start')}
        />
      )
      legalNotice = <div className='legalNotice' data-l10n-id='legalNotice' />
    }

    if (torrentIdProtocol === 'magnet:') {
      saveButton = (
        <Button
          l10nId='copyMagnetLink'
          className='whiteButton copyMagnetLink'
          onClick={() => dispatch('copyMagnetLink')}
        />
      )
    } else {
      saveButton = (
        <Button
          l10nId='saveTorrentFile'
          className='whiteButton saveTorrentFile'
          onClick={() => dispatch('saveTorrentFile')}
        />
      )
    }

    return (
      <div className='siteDetailsPage'>
        <div className='siteDetailsPageHeader'>
          {titleElem}

          <div className='headerActions'>
            {mainButton}
            {saveButton}
          </div>
        </div>

        <div className='siteDetailsPageContent'>
          <TorrentStatus torrent={torrent} errorMessage={errorMessage} />
          <TorrentFileList
            torrentId={torrentId}
            torrent={torrent}
            serverUrl={serverUrl}
            stateOwner={this}
          />

          {legalNotice}
        </div>
      </div>
    )
  }
}

module.exports = TorrentViewer
