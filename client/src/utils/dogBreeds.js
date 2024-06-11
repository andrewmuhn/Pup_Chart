const dogBreeds = [
  'Afghan Hound',
  'Airedale Terrier',
  'Akita',
  'Alaskan Malamute',
  'Alpine Dachsbracke',
  'American Foxhound',
  'American Staffordshire Terrier',
  'American Water Spaniel',
  'Appenzell Cattle Dog',
  'Appenzell Mountain Dog',
  'Ariegeois',
  'Armenian Gamper',
  'Artois Hound',
  'Atlas Mountain Dog (Aidi)',
  'Austrian Black And Tan Hound',
  'Austrian Pinscher',
  'Austrian Short-Haired Pinscher',
  'Australian Cattle Dog',
  'Australian Kelpie',
  'Australian Silky Terrier',
  'Australian Terrier',
  'Azawakh',
  'Basenji',
  'Basset Fauve De Bretagne',
  'Beagle Harrier',
  'Bearded Collie',
  'Beauce Sheepdog',
  'Bedlington Terrier',
  'Belgian Laekenois',
  'Belgian Shepherd Dog',
  'Belgian Tervueren',
  'Bernese Mountain Dog',
  'Billy',
  'Black And Tan Coonhound',
  'Bloodhound',
  'Blue Gascony Basset',
  'Blue Gascony Griffon',
  'Boerboel',
  'Bohemian Wire-Haired Pointing Griffon',
  'Bordoodle',
  'Border Collie',
  'Border Terrier',
  'Borzoi',
  'Bouvier Des Flandres',
  'Boxer',
  'Boykin Spaniel',
  'Brazilian Terrier',
  'Briard',
  'Briquet Griffon Vendeen',
  'Brittany Spaniel',
  'Broholmer',
  'Brussels Griffon',
  'Bull Terrier',
  'Bulldog',
  'Bullmastiff',
  'Burgos Pointing Dog',
  'Cairn Terrier',
  'Canaan Dog',
  'Canarian Warren Hound',
  'Caribbean Mastiff',
  'Carolina Dog',
  'Catalan Sheepdog',
  'Caucasian Shepherd Dog',
  'Cavalier King Charles Spaniel',
  'Central Asian Shepherd Dog',
  'Cesky Terrier',
  'Chesapeake Bay Retriever',
  'Chihuahua',
  'Chinese Crested Dog',
  'Chinook',
  'Chipoo',
  'Chorkie',
  'Cockapoo',
  'Collie Smooth',
  'Continental Toy Spaniel',
  'Coton De Tulear',
  'Croatian Sheepdog',
  'Curly-Coated Retriever',
  'Dachshund',
  'Dalmatian',
  'Dandie Dinmont Terrier',
  'Deutsche Bracke',
  'Deutsch Stichelhaar',
  'Dobermann',
  'Dogo Argentino',
  'Dogo Guatemalteco',
  'Dogue De Bordeaux',
  'Drentsche Partridge Dog',
  'Dutch Schapendoes',
  'Dutch Shepherd Dog',
  'Dutch Smoushond',
  'East Siberian Laika',
  'Estonian Hound',
  'Estrela Mountain Dog',
  'Eurasian',
  'European Village Dog',
  'English Cocker Spaniel',
  'English Pointer',
  'English Setter',
  'English Toy Terrier',
  'Entlebuch Cattle Dog',
  'Entlebucher Mountain Dog',
  'Estrela Mountain Dog',
  'Eurasian',
  'Field Spaniel',
  'Fila Brasileiro',
  'Finnish Hound',
  'Finnish Lapphund',
  'Finnish Spitz',
  'Flat-Coated Retriever',
  'French Bulldog',
  'French Spaniel',
  'French Tricolour Hound',
  'French Water Dog',
  'German Hound',
  'German Pinscher',
  'German Shepherd Dog',
  'German Spitz',
  'German Wire-Haired Pointing Dog',
  'Giant Schnauzer',
  'Glen Of Imaal Terrier',
  'Golden Retriever',
  'Golden Siberian',
  'Goldendoodle',
  'Gordon Setter',
  'Grand Basset Griffon Vendeen',
  'Grand Griffon Vendeen',
  'Great Anglo-French Tricolour Hound',
  'Great Anglo-French White And Black Hound',
  'Great Anglo-French White & Orange Hound',
  'Great Dane',
  'Great Gascony Blue',
  'Great Japanese Dog',
  'Great Pyrenees',
  'Greater Swiss Mountain Dog',
  'Greenland Dog',
  'Greyhound',
  'Griffon Belge',
  'Griffon Bruxellois',
  'Griffon Nivernais',
  'Halden Hound',
  'Hamiltonstovare',
  'Harrier',
  'Havanese',
  'Hovawart',
  'Hungarian Greyhound',
  'Hungarian Hound - Transylvanian Scent Hound',
  'Hungarian Short-Haired Pointer (Vizsla)',
  'Hungarian Wire-Haired Pointer',
  'Hygen Hound',
  'Ibizan Podenco',
  'Icelandic Sheepdog',
  'Indian Pariah Dog',
  'Irish Glen Of Imaal Terrier',
  'Irish Red And White Setter',
  'Irish Setter',
  'Irish Soft Coated Wheaten Terrier',
  'Irish Terrier',
  'Irish Water Spaniel',
  'Irish Wolfhound',
  'Israeli Canaan Dog',
  'Italian Greyhound',
  'Jack Russell Terrier',
  'Japanese Chin',
  'Japanese Spitz',
  'Japanese Terrier',
  'Jämthund',
  'Jonang',
  'Kai',
  'Kangal Shepherd Dog',
  'Karelia Bear Dog',
  'Karelian Bear Dog',
  'Karst Shepherd Dog',
  'Keeshond',
  'Kerry Blue Terrier',
  'Kishu',
  'Komondor',
  'Kooikerhondje',
  'Korean Jindo Dog',
  'Kromfohrlander',
  'Kuvasz',
  'Labrador Retriever',
  'Labradoodle',
  'Labsky',
  'Lagotto Romagnolo',
  'Lakeland Terrier',
  'Landseer (European Continental Type)',
  'Lapphund',
  'Lapponian Herder',
  'Leonberger',
  'Lhasa Apso',
  'Little Lion Dog',
  'Lowchen',
  'Maltese',
  'Malshi',
  'Manchester Terrier',
  'Manchester Terrier (Toy)',
  'Majorca Mastiff',
  'Majorca Shepherd Dog',
  'Mallorquin Bulldog',
  'Malinois',
  'Maltese',
  'Manchester Terrier',
  'Manchester Terrier (Toy)',
  'Maremma Sheepdog',
  'Mastiff',
  'Miniature American Shepherd',
  'Miniature Bull Terrier',
  'Miniature Pinscher',
  'Miniature Schnauzer',
  'Montenegrin Mountain Hound',
  'Morkie',
  'Mudi',
  'Neapolitan Mastiff',
  'Nederlandse Kooikerhondje',
  'New Guinea Singing Dog',
  'Newfoundland',
  'Norfolk Terrier',
  'Norrbottenspitz',
  'Norwegian Buhund',
  'Norwegian Elkhound Black',
  'Norwegian Elkhound Grey',
  'Norwegian Lundehund',
  'Norwich Terrier',
  'Nova Scotia Duck Tolling Retriever',
  'Old Danish Pointing Dog',
  'Old English Sheepdog',
  'Otterhound',
  'Papillon',
  'Peekapoo',
  'Pekingese',
  'Pembroke Welsh Corgi',
  'Perro Majorero',
  'Peruvian Hairless Dog',
  'Petit Basset Griffon Vendeen',
  'Petit Brabançon',
  'Pharaoh Hound',
  'Pit Bull Terrier',
  'Plott Hound',
  'Pointer',
  'Polish Greyhound',
  'Polish Hound',
  'Polish Lowland Sheepdog',
  'Pomeranian',
  'Pomsky',
  'Poodle',
  'Poodle (Miniature)',
  'Poodle (Toy)',
  'Portuguese Podengo',
  'Portuguese Sheepdog',
  'Portuguese Warren Hound-Portuguese Podengo',
  'Portuguese Water Dog',
  'Presa Canario',
  'Pug',
  'Puggle',
  'Puli',
  'Pumi',
  'Pyrenean Mastiff',
  'Pyrenean Mountain Dog',
  'Rafeiro Of Alentejo',
  'Rhodesian Ridgeback',
  'Romanian Carpathian Shepherd Dog',
  'Romanian Mioritic Shepherd Dog',
  'Romanian Raven Shepherd Dog',
  'Rottweiler',
  'Russian Black Terrier',
  'Russian Toy',
  'Russian-European Laika',
  'Saarloos Wolfhond',
  'Saint Bernard',
  'Saluki',
  'Samoyed',
  'Schipperke',
  'Schnoodle',
  'Scottish Deerhound',
  'Scottish Terrier',
  'Sealyham Terrier',
  'Serbian Tricolour Hound',
  'Shar Pei',
  'Shetland Sheepdog',
  'Shiba',
  'Shih-Poo',
  'Shih Tzu',
  'Shikoku',
  'Siberian Husky',
  'Siberian Native Dog',
  'Skye Terrier',
  'Slovak Cuvac',
  'Slovakian Hound',
  'Small Blue Gascony',
  'Small Munsterlander',
  'Small Swiss Hound',
  'Smooth Collie',
  'South Russian Shepherd Dog',
  'Southern African Village Dog',
  'Spanish Greyhound',
  'Spanish Mastiff',
  'Spanish Water Dog',
  'Stabyhoun',
  'Staffordshire Bull Terrier',
  'Standard Schnauzer',
  'Sussex Spaniel',
  'Swedish Lapphund',
  'Swedish Vallhund',
  'Swiss Hound',
  'Tatra Shepherd Dog',
  'Thai Bangkaew Dog',
  'Thai Ridgeback Dog',
  'Tibetan Mastiff',
  'Tibetan Spaniel',
  'Tibetan Terrier',
  'Tiger Dog',
  'Tosa',
  'Toy Fox Terrier',
  'Transylvanian Hound',
  'Treeing Walker Coonhound',
  'Tyrolean Hound',
  'Vizsla',
  'Vikhan Sheepdog',
  'Weimaraner',
  'Welsh Corgi (Cardigan)',
  'Welsh Corgi (Pembroke)',
  'Welsh Hillman',
  'Welsh Terrier',
  'West Highland White Terrier',
  'West Siberian Laika',
  'Westphalian Dachsbracke',
  'Wetterhoun',
  'Whippet',
  'White Swiss Shepherd Dog',
  'Wirehaired Slovakian Pointer',
  'Xoloitzcuintle',
  'Yorkipoo',
  'Yorkshire Terrier',
  'Yorkshire Terrier-Chihuahua',
  'Yugoslavian Shepherd Dog - Sharplanina',
];
export default dogBreeds;