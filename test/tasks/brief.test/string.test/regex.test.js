import { deco, StrX, ArrX } from '../../../../src'
import { GP } from 'elprimero'

export class RegexTest {
  static acquireContentWithinParenthesis () {

    const sentence = 'I expect five hundred dollars (($500)). -[(Mark Twain)]'

    let regExps = [
      /\(([^)]+)\)/,
      /\((.*?)\)/,
      /\((.*?)\)/gs,
      /\((.*)\)/
    ]
    for (let [k, regExp] of regExps.entries()) {
      `${k}`.tag(regExp)  |> console.log
      let matches = sentence.match(regExp)
      GP.now().tag('match').tag(ArrX.vBrief(matches || []))  |> console.log
      let splits = sentence.split(regExp)
      GP.now().tag('split').tag(ArrX.vBrief(splits || []))  |> console.log
      StrX  |> console.log
    }

    let searchBrackets = (tx) => {
      let fibb = 0
      let lifb = 0
      while (fibb !== -1) {
        let rsl = approach(tx, lifb, fibb)
        GP.now().tag(`'${deco(rsl)}'`)  |> console.log
        fibb = rsl.y + 1
        lifb = rsl.x - 1
      }
    }
    let approach = (tx, lifb = 0, fibb = 0) => {
      let y = tx.lastIndexOf(')', fibb)
      let x = y > 0 ? tx.lastIndexOf('(', y) : -1
      ArrX.hBrief([x, y])  |> console.log
      return {
        x,
        y,
        tx: x !== -1 && y !== -1 ? tx.slice(x + 1, y) : tx
      }
    }
    sentence  |> console.log
    GP.now().tag('approach').tag(`'${deco(approach(sentence))}'`)  |> console.log
    searchBrackets(sentence)
    'done'  |> console.log
  }

  static matchWords () {
    let regexSet = [
      /[A-Za-z\d]+/g
    ]
    const sentences = [
      'Stocks traded, total value (% of GDP)',
      'Market capitalization of listed domestic companies (% of GDP)',
      'Foreign direct investment, net inflows (% of GDP)',
      'Foreign direct investment, net outflows (% of GDP)',
    ]

    for (let [k, regex] of regexSet.entries()) {
      `${k}`.tag(regex)  |> console.log
      for (let [, sentence] of sentences.entries()) {
        // `  ${i}`.tag(sentence)  |> console.log
        try {
          let jalike = StrX.py2jv(sentence)
          // '    py2jv'.tag(i).tag(jalike)  |> console.log
          let pylike = StrX.jv2py(jalike, '_')
          // '    jv2py'.tag(i)  |> console.log
          pylike  |> console.log
        } catch (e) {
          console.log(e)
        }
      }
    }

  }
}
