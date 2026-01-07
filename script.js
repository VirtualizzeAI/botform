import { chromium } from 'playwright'

export async function runScript() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto('https://web.solvis.net.br/s/acpo', {
      waitUntil: 'load',
      timeout: 60000
    })
    await page.waitForSelector('text=Express Mossoró')

    console.log("[1] Selecionando 'Express Mossoró'")
    await page.getByText('Express Mossoró').click()
    console.log("[1] Clicando em Avançar'")
    await page.getByText('Avançar').click()

    const nota = Math.floor(Math.random() * 2) + 9
    console.log(`[2] Nota selecionada: ${nota}`)
    await page.getByText(String(nota)).click()
    await page.getByText('Avançar').click()

    console.log('[3] Selecionando 2 opções aleatórias')

    await page.waitForSelector(
      'div.multiple-response-vertical-table input[type="checkbox"]'
    )

    const checkboxes = await page.$$(
      'div.multiple-response-vertical-table input[type="checkbox"]'
    )
    console.log(`Número de checkboxes encontrados: ${checkboxes.length}`)

    if (checkboxes.length < 2) {
      throw new Error('Menos de 2 checkboxes disponíveis!')
    }

    const escolhidas = new Set()
    let tentativas = 0
    const maxTentativas = 20

    while (escolhidas.size < 2 && tentativas < maxTentativas) {
      const idx = Math.floor(Math.random() * checkboxes.length)
      if (!escolhidas.has(idx)) {
        escolhidas.add(idx)
        await checkboxes[idx].click()
      }
      tentativas++
    }

    if (escolhidas.size < 2) {
      throw new Error('Não foi possível selecionar 2 checkboxes diferentes.')
    }

    await page.getByText('Avançar').click()

    console.log('[4] Respostas fixas: Sim / Mídias Sociais')
    await page.getByText('Sim').click()
    await page.getByText('Mídias sociais').click()
    await page.getByText('Avançar').click()

    console.log('[5] Avançando direto')
    await page.getByText('Avançar').click()

    console.log("[6] Selecionando 'Não, obrigado' e confirmando")
    await page.getByText('Não, obrigado').click()
    await page.getByText('Confirmar').click()

    console.log('[✓] Execução concluída com sucesso')
  } catch (error) {
    console.error('[✗] Falha na execução:', error)
    throw error
  } finally {
    await browser.close()
  }
}