<template>
  <div class="span9">
    <h1>CGA characteristics</h1>

    <h4>CHARACTERISTICS OF THE CGA</h4>
    <p>The SCAR Composite Gazetteer of Antarctica (CGA) contains all the names that have been published in national
      gazetteers, plus information about those names where known. The countries who contributed data to the
      project, and the number of names they hold in their national Antarctic gazetteers are listed under
      <router-link :to="{ path: '/information/statistics' }">Statistics</router-link>. </p>
    <p><strong>Synonyms</strong><br>In addition to the approved names, several national
      gazetteers list synonyms for a given geographic feature; these are commonly labelled as variants in the
      published gazetteers. Synonyms include relic (historical) names, mis-spellings and incorrect applications
      but they also include linguistically correct forms of geographic names in a foreign language. By including
      synonyms for a given feature, a national gazetteer records the existence of names different from the one
      officially recommended for that feature. A synonym in one country's gazetteer can be the approved name in a
      gazetteer of another country and vice versa.</p>
    <p>The CGA represents a composite list of approved names taken from all the current national gazetteers
      available. Synonyms in individual gazetteers have been excluded since all the names in current usage exist
      as approved entries in other gazetteers. However, it is recognized that the lack of historical names and
      other types of synonyms will limit the value of the CGA when researching scientific literature of a
      historical nature or written in different languages. The inclusion of such synonyms may be considered for a
      future work.</p>
    <p><strong>Geographic coverage and content</strong><br>
      The geographic coverage of the CGA lies south of latitude 60°S. Although the interest of SCAR extends North
      of 60°S and encompasses all the areas inside the Antarctic Convergence and also several sub-Antarctic
      islands, the geographic features North of 60°S either fall within the sovereignty of a particular country
      or, in the case of oceanic features, are named according to the rules of international bodies. Thus it was
      agreed in SCAR that the CGA should be limited to the area South of 60°S, where as a matter of fact there is
      no single recognised naming authority. Accordingly, those records or sections of national gazetteers which
      refer to areas outside the agreed limit have not been included in the CGA database. </p>
    <p><strong>Scientific stations</strong><br>
      There are different national approach about whether Antarctic scientific Stations should be included in a
      list of geographic features or not. Some national gazetteers include Antarctic Stations and some do not. A
      man-made structure is not a natural geographic feature but the location of a Station is an important piece
      of geographic information. Because the CGA is just a compilation originating from the national gazetteers,
      no Station has been deleted nor was there an attempt to obtain a complete list of Stations. As a
      consequence, some but not all Antarctic Stations are listed in the CGA. An updated list of the Antarctic
      Station, however, is permanently available on the <a href="www.comnap.aq">COMNAP site</a>.</p>
    <p><strong>Word order of entries</strong><br>
      Most geographical names (toponym) are composed of a generic term and by a specific term. In the CGA entries
      were arranged alphabetically with the specific term first, as would appear in a gazetteer. For example, Cape
      Dalton would be listed as "Dalton, Cape", Mount Dalton as "Dalton, Mount", Dalton Iceberg Tongue as "Dalton
      Iceberg Tongue". In the early 2020's the official name wasn't clear for many entries, so the CGA displays
      the name as the official name. In addition it shows the name as it would appear in a gazetteer and the name
      as it would appear on a map. This is still a work in progress for many entries. E.g. Mount Abbs would appear
      in a gazetteer as Abbs, Mount , but on a map as Mount Abbs,</p>
    <p><strong>Transliteration</strong><br>
      A characteristic which makes the SCAR CGA a rather singular publication (not unique, however) is the diverse
      origin of the data, derived from different languages and alphabets. The transliteration adopted in the SCAR
      CGA is the one provided by the country approving the relevant names. A transliteration was needed for
      Chinese, Japanese, Russian, Bulgarian, and Polish names.</p>
    <p><strong>Diacritical marks</strong><br>
      In several languages words are correctly spelled only by making use of diacritical marks. To reproduce
      correctly all diacritical marks used in the national gazetteers would be cumbersome, so initially they were
      omitted when the names were first made available on the web.</p>
    <p>Diacritical mark were kept in the printed version of the CGA. In the publication all diacritical are
      identical to those present in the original gazetteers. Under this respect the printed version of the CGA is
      more aligned with the national gazetteers than the data available on the web site.
    </p>
    <p>It is now possible to add diacritical marks to the web content. Some marks may still be missing. Reference
      needs to be made to the now out-of-date printed version of the CGA.</p>
    <p><strong>Basic information</strong><br>
      For each name, CGA contains the following information (not all of them always
      available):</p>
    <ul>
      <li> source, i.e. the country which provided the name;</li>
      <li> approval date, when an official approval has been issued by the relevant
        country's organization for geographical names; </li>
      <li>latitude and longitude in decimal degree and degree, minute, second formats;</li>
      <li>height above sea level;</li>
      <li>class; and</li>
      <li>reference number. </li>
      <li>name_id, a unique number identifying a place name;</li>
      <li>place_id, a unique number identifying a specific geographic feature. A feature can have multiply
        place_ids because it can have multiply names.</li>
    </ul>
    <p>As to the latitude and longitude it should be noted that the co-ordinates supplied by the national gazetteers
      are usually accurate to a minute of arc. However, the accuracy of the values assigned to the co-ordinates
      varies according to the nature of the feature itself and the scale of the map available for identifying the
      feature. Although the accuracy in the location of a nunatak or a cape can be within a few metres or tens of
      metres, the co-ordinates locating the central point of a mountain range or an island will be much less
      accurate, the accuracy decreasing as the size of the feature increases. Because no standard algorithms are
      used to calculate the characteristic co-ordinates of an extended feature (for example, the central point of
      the area inside a contour line), different gazetteers attribute different pairs of co-ordinates to the same
      feature, even when there is perfect agreement about the feature under consideration and its name. </p>
    <p><strong>Generic terms</strong><br>
      The name of a geographic feature is usually made up of two parts which are generally called the generic term
      and the specific term (e.g. the generic part or term of Terra Nova Bay is "Bay" and the specific part is
      "Terra Nova". That is not always true, however. See for instance the toponym "Tour de Pise" or "Three
      Brothers". The International Principles and Procedures for Antarctic Place Names includes more information
      under 5.2 Classification of geographic features.</p>
    <p>Although the generic term provides a good indication of the type of feature being named, it must be
      remembered that data in the CGA originated from 23 sources, in 12 different languages. A scientist working
      with the CGA should be familiar with the different generic terms and their equivalents in other languages.
      The <a href="https://data.aad.gov.au/feature-type/">SCAR Feature Type Catalogue</a> describes common terms
      used to describe different types of geographic features.</p>
  </div>
</template>
