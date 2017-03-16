/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

const React = require('react')
const ImmutableComponent = require('../../../js/components/immutableComponent')
const {StyleSheet, css} = require('aphrodite')
const commonStyles = require('./styles/global')

class BrowserActionBadge extends ImmutableComponent {
  constructor () {
    super()
    this.determineLayout = this.determineLayout.bind(this)
  }

  determineLayout () {
    this.centered = this.refs.badge && this.refs.badge.offsetWidth > 16
  }

  componentDidMount () {
    this.determineLayout()
  }

  componentDidUpdate () {
    this.determineLayout()
  }

  render () {
    return <div
      ref='badge'
      className={css(
        styles.browserActionBadge,
        this.centered && styles.centered
      )}
      style={{backgroundColor: this.props.color || commonStyles.color.braveMediumOrange}}
      >{this.props.text}</div>
  }
}

const styles = StyleSheet.create({
  browserActionBadge: {
    color: 'white',
    bordeRadius: '2px',
    padding: '1px 2px',
    pointerEvents: 'none',
    font: '7pt "Arial Narrow"',
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '40%',
    border: '.5px solid #FFF',
    minWidth: '8px'
  },
  centered: {
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: 'calc(100% - 5px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})

module.exports = BrowserActionBadge
