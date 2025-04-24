const { chromium } = require('playwright');

// Delay reutilizável para aguardar entre ações
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await chromium.launch({ headless: true }); // Coloque "false" para visualizar o navegador
  const page = await browser.newPage();

  try {
    await page.goto('https://web.solvis.net.br/s/acpo', { waitUntil: 'networkidle' });

    console.log("[1] Selecionando 'Express Mossoró'");
    await page.getByRole('button', { name: 'Express Mossoró' }).click();
    await page.getByRole('button', { name: 'Avançar' }).click();

    const nota = Math.floor(Math.random() * 4) + 7;
    console.log(`[2] Nota selecionada: ${nota}`);
    await page.getByRole('button', { name: String(nota) }).click();
    await page.getByRole('button', { name: 'Avançar' }).click();

    console.log("[3] Selecionando 2 opções aleatórias");
    const opcoes = await page.$$('button.mat-button');
    const escolhidas = new Set();
    while (escolhidas.size < 2) {
      const idx = Math.floor(Math.random() * opcoes.length);
      if (!escolhidas.has(idx)) {
        escolhidas.add(idx);
        await opcoes[idx].click();
      }
    }
    await page.getByRole('button', { name: 'Avançar' }).click();

    console.log("[4] Respostas fixas: Sim / Mídias Sociais");
    await page.getByRole('button', { name: 'Sim' }).click();
    await page.getByRole('button', { name: 'Mídias sociais' }).click();
    await page.getByRole('button', { name: 'Avançar' }).click();

    console.log("[5] Avançando direto");
    await page.getByRole('button', { name: 'Avançar' }).click();

    console.log("[6] Selecionando 'Não, obrigado' e confirmando");
    await page.getByRole('button', { name: 'Não, obrigado' }).click();
    await page.getByRole('button', { name: 'Confirmar' }).click();

    console.log("[✓] Execução concluída com sucesso");
    await browser.close();
    process.exit(0);

  } catch (error) {
    console.error("[✗] Falha na execução:", error);
    await browser.close();
    process.exit(1);
  }
})();
