import { StrX } from '../../../../src/brief/StrX'
import { Dic } from 'veho'
import { TableX } from '../../../../src/brief/TableX'
import { transpose } from '../../../../src/utils/algebra'

class ChnEngTransTest {
  static test () {
    const chns = Array.from('，．　；：＇＂／？～！＠＃％＾＆＊（）＿＋－＝')
    const engs = chns.map(StrX.toHalfAngle)
    'full to half' |> console.log
    const full_half = Dic.ini(chns, engs)
    full_half|> console.log
    '' |> console.log

    'half to full' |> console.log
    const half_full = Dic.ini(engs, engs.map(StrX.toFullAngle))
    half_full |> console.log

    const chn_codes = chns.map(it => it.charCodeAt(0))
    const eng_codes = engs.map(it => it.charCodeAt(0))
    const table = {
      head: ['chns', 'engs', 'chn_codes', 'eng_codes'],
      rows: transpose([chns, engs, chn_codes, eng_codes])
    }
    'table' |> console.log
    TableX.brief(table, { chinese: true }) |> console.log
  }

}

it('ChnEngTransTest', () => {
  ChnEngTransTest.test()
})