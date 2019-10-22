import { Xr } from '../../../src'

it('X: ini Fun ', () => {
  Xr('Fun', 1, 2, 3)
    .tag('Property', 'Fine')
    .line('Headline', 'some')
    .increaseIndent()
    .line('Subheader Alpha', 'some other')
    .line('  Paragraph', 'out of service').tag('Mark', 'not bad').p('...')
    .decreaseIndent()
    .line('Subheader Beta', 'blah blah').pline('   to be continued...', '...', '...')
    .tx |> console.log

  Xr('   ').p('start').increaseIndent().tag(1, 2, 3, 4, 5).p(6, 7).line(8, 9, 10).pline(10, NaN, undefined).tx |> console.log
})