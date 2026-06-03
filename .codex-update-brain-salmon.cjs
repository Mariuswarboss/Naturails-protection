const fs = require('fs');

const updates = {
  ro: {
    name: "NATURE'S PROTECTION SUPERIOR CARE gustari suplimentare pentru dezvoltarea creierului la cainii cu blana alba, cu somon",
    description: {
      details: "Nature's Protection Superior Care White Dogs Grain Free Brain Development sunt gustari suplimentare pentru bunastarea generala si sustinerea dezvoltarii creierului.\n\nSursa principala de proteina este somonul, o proteina de calitate inalta, usor digerabila, bogata in acizi grasi Omega-3, vitamine si minerale. Somonul este considerat o sursa hipoalergenica de proteina si are o palatabilitate ridicata.\n\nAceste gustari functionale au o textura mai umeda si mai moale decat recompensele obisnuite. Produsele mai umede au o aroma naturala mai intensa, fiind atractive chiar si pentru animalele pretentioase. Gustarile sunt imbogatite cu MicroZeoGen, clinoptilolit de origine vulcanica, care ajuta la eliminarea toxinelor si la absorbtia eficienta a nutrientilor, vitaminelor si mineralelor.\n\nCompozitia contine alge marine, sursa naturala de vitamine A, C, K si B6, calciu, potasiu, cupru, iod si mangan, care pot sustine indepartarea placii dentare si a tartrului. Gustarile nu contin ingrediente de origine cerealiera, porumb sau soia.",
      components: "Compozitie: somon min. 24% (uscat si macinat fin), amidon de cartofi pregelatinizat, faina de pene hidrolizata, pulpa de cartofi uscata, alga Ascophyllum nodosum (6%), sorbitol, glicerina, sirop de glucoza, fibra de mazare, clinoptilolit micronizat dinamic (1%), chitosamina (din animale acvatice) (1%), fructooligozaharide (FOS), extract de ceai verde (0,5%), glucozamina (500 mg/kg), sulfat de condroitina (250 mg/kg), alge uscate Schizochytrium sp. (0,16%).",
      vitaminsAndMinerals: "Aditivi/1 kg: vitamina D3 577 UI, vitamina E 204 mg, biotina 0,08 mg. Vitamina D3 sustine reglarea nivelului de calciu si fosfor si dezvoltarea sanatoasa a oaselor. Vitamina E actioneaza ca antioxidant si sustine imunitatea si sanatatea pielii. Biotina, vitamina B7, sustine pielea sanatoasa si cresterea blanii. Aditivi tehnologici: antioxidanti, conservanti. Aditivi zootehnici: stabilizatori ai florei intestinale Bacillus subtilis DSM 15544 - 1 x 10^10 CFU. Constituenti analitici: proteina bruta 22%, fibre brute 4,5%, grasime bruta 3,7%, cenusa bruta 5,7%, umiditate 20%, amidon 13,5%, sodiu 0,11%, potasiu 0,38%, glicerol 3,74%, zaharuri totale 4,52%.",
      instructions: "Instructiuni de hranire: doza zilnica poate varia in functie de temperatura exterioara, stilul de viata, temperamentul si activitatea animalului. Apa curata si proaspata trebuie sa fie disponibila permanent.",
    },
  },
  ru: {
    name: "NATURE'S PROTECTION SUPERIOR CARE дополнительные лакомства для развития мозга у собак с белой шерстью, с лососем",
    description: {
      details: "Nature's Protection Superior Care White Dogs Grain Free Brain Development - дополнительные лакомства для общего самочувствия питомца и поддержки развития мозга.\n\nОсновной источник белка - лосось, высококачественный, легкоусвояемый белок, богатый жирными кислотами Omega-3, витаминами и минералами. Лосось считается гипоаллергенным источником белка и отличается высокой вкусовой привлекательностью.\n\nЭти функциональные лакомства имеют более влажную и мягкую текстуру, чем обычные угощения. Более влажные продукты раскрывают натуральный аромат, поэтому нравятся даже привередливым питомцам. Лакомства обогащены MicroZeoGen, клиноптилолитом вулканического происхождения, который помогает выводить токсины и улучшать усвоение питательных веществ, витаминов и минералов.\n\nСостав содержит морские водоросли - натуральный источник витаминов A, C, K и B6, кальция, калия, меди, йода и марганца, которые могут поддерживать удаление зубного налета и камня. Лакомства не содержат зерновых ингредиентов, кукурузы или сои.",
      components: "Состав: лосось мин. 24% (сушеный и мелко измельченный), предварительно желатинизированный картофельный крахмал, гидролизованная перьевая мука, сушеная картофельная пульпа, водоросли Ascophyllum nodosum (6%), сорбитол, глицерин, сироп глюкозы, гороховая клетчатка, динамически микронизированный клиноптилолит (1%), хитозамин (из водных животных) (1%), фруктоолигосахариды (FOS), экстракт зеленого чая (0,5%), глюкозамин (500 мг/кг), хондроитин сульфат (250 мг/кг), сушеные водоросли Schizochytrium sp. (0,16%).",
      vitaminsAndMinerals: "Добавки/1 кг: витамин D3 577 МЕ, витамин E 204 мг, биотин 0,08 мг. Витамин D3 поддерживает регулирование уровня кальция и фосфора и здоровое развитие костей. Витамин E действует как антиоксидант, поддерживает иммунитет и здоровье кожи. Биотин, витамин B7, поддерживает здоровую кожу и рост шерсти. Технологические добавки: антиоксиданты, консерванты. Зоотехнические добавки: стабилизаторы кишечной флоры Bacillus subtilis DSM 15544 - 1 x 10^10 CFU. Аналитические компоненты: сырой белок 22%, сырая клетчатка 4,5%, сырой жир 3,7%, сырая зола 5,7%, влажность 20%, крахмал 13,5%, натрий 0,11%, калий 0,38%, глицерин 3,74%, общие сахара 4,52%.",
      instructions: "Инструкция по кормлению: суточная норма может меняться в зависимости от температуры на улице, образа жизни, темперамента и активности питомца. Чистая свежая вода должна быть доступна постоянно.",
    },
  },
};

for (const locale of ['ro', 'ru']) {
  const path = `src/locales/${locale}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data.product_names['KIKNPSC-BRAIN-SALMON'] = updates[locale].name;
  data.product_descriptions['KIKNPSC-BRAIN-SALMON'] = updates[locale].description;
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
