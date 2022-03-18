import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { withTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import path from 'path'
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper
} from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Chain from '../components/chain/chain'
import MultiChain from '../components/multichain/multichain'
import Header from '../components/header/header'

import SearchIcon from '@material-ui/icons/Search';
import useSWR from 'swr'

import classes from './index.module.css'
import { Introduction } from '../components/introduction/introduction';

const searchTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2F80ED',
    },
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: [
      'Inter',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '12px'
    }
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        "box-shadow": '0px 7px 7px #0000000A;',
        "-webkit-box-shadow": '0px 7px 7px #0000000A;',
        "-moz-box-shadow": '0px 7px 7px #0000000A;',
      }
    },
    MuiInputBase: {
      input: {
        fontSize: '14px'
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '12.5px 14px'
      },
      notchedOutline: {
        borderColor: "#FFF",
      }
    },
  },
});

const fetcher = (url: string) => fetch(url).then(res => res.json())

function Home({ changeTheme, theme }) {
  const { data, error } = useSWR('https://teleport-network.github.io/chains/chains.json', fetcher)

  const [ layout, setLayout ] = useState('grid')
  const [ search, setSearch ] = useState('')
  const [ hideAd, setHideAd ] = useState('1')
  const router = useRouter()
  if (router.query.search) {
    setSearch(router.query.search as string)
    delete router.query.search
  }

  const onSearchChanged = (event) => {
    setSearch(event.target.value)
  }

  const handleLayoutChanged = (event, newVal) => {
    if(newVal !== null) {
      setLayout(newVal)
      localStorage.setItem('yearn.finance-invest-layout', newVal ? newVal : '')
    }
  }

  const closeMultichain = (perma) => {
    setHideAd('1')
    localStorage.setItem('chainlist.org-hideMultichain', perma ? '1' : '0')
  }

  useEffect(() => {
    const multi = localStorage.getItem('chainlist.org-hideMultichain')
    if(multi) {
      setHideAd(multi)
    } else {
      setHideAd('0')
    }
  }, [])

  return (
    <div className={styles.container}>
      <Head>
      <title>Teleport Chainlist</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <div className={ theme.palette.type === 'dark' ? classes.containerDark : classes.container }>
          <Introduction />
          <div className={ theme.palette.type === 'dark' ? classes.listContainerDark : classes.listContainer }>
            <div className={ theme.palette.type === 'dark' ? classes.headerContainerDark : classes.headerContainer }>
              <div className={ classes.filterRow }>
                <ThemeProvider theme={searchTheme}>
                  <Paper className={ classes.searchPaper }>
                    <TextField
                      fullWidth
                      className={ classes.searchContainer }
                      variant="outlined"
                      placeholder="ETH, Fantom, ..."
                      value={ search }
                      onChange={ onSearchChanged }
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <SearchIcon fontSize="small"  />
                        </InputAdornment>,
                        startAdornment: <InputAdornment position="start">
                          <Typography className={ classes.searchInputAdnornment }>
                            Search Networks
                          </Typography>
                        </InputAdornment>
                      }}
                    />
                  </Paper>
                </ThemeProvider>
              </div>
              <Header changeTheme={ changeTheme } />
            </div>
            <div className={ classes.cardsContainer }>
              {/* { hideAd === '0' && <MultiChain closeMultichain={ closeMultichain } /> } */}
              {
                data && data.filter((chain) => {
                  if(search === '') {
                    return true
                  } else {
                    //filter
                    return (chain.chain.toLowerCase().includes(search.toLowerCase()) ||
                    chain.chainId.toString().toLowerCase().includes(search.toLowerCase()) ||
                    chain.name.toLowerCase().includes(search.toLowerCase()) ||
                    (chain.nativeCurrency ? chain.nativeCurrency.symbol : '').toLowerCase().includes(search.toLowerCase()))
                  }
                }).map((chain, idx) => {
                  return <Chain chain={ chain } key={ idx } />
                })
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default withTheme(Home)

// export const getStaticProps  = async () => {
//
//   try {
//     const chainsResponse = await fetch('https://chainid.network/chains.json')
//     const chainsJson = await chainsResponse.json()
//
//     return {
//       props: {
//         chains: chainsJson
//       },
//       revalidate: 60,
//     }
//   } catch (ex) {
//     return {
//       props: {
//         chains: []
//       }
//     }
//   }
//
// }
