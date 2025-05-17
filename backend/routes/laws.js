const express = require('express');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const Law = require('../models/law');

const router = express.Router();

function formatSectionAsList(heading, content) {
  const formattedContent = content.map(item =>
    item.replace(/^([^:]+)(:)/, '<b>$1$2</b>')
  );
  return [`<b>${heading}</b>`, ...formattedContent];
}

// Law data map
const lawData = {
  "workplace-harassment": {
    title: "Sexual Harassment of Women at Workplace Act",
    pdfUrl: "https://cpwd.gov.in/iccposhact/Handbook-on-Sexual-Harassment-of-Women-at-Workplace.pdf",
    rights: [
      ...formatSectionAsList("Complainant Rights", [
        "Confidentiality: Identity of the complainant is protected.",
        "Support for FIR: Help with First Information Report.",
        "Protection from Retaliation: Safeguards against backlash.",
        "Right to Appeal: Can appeal unsatisfactory decisions."
      ]),
      ...formatSectionAsList("Respondent Rights", [
        "Fair Hearing: Right to fair hearing.",
        "Confidentiality: Identity protected.",
        "Right to Appeal: Can appeal decision."
      ])
    ],
    actions: [
      ...formatSectionAsList("Actions You Can Take", [
        "Submit a Complaint Within 3 Months: File soon after incident.",
        "Choose Resolution: Informal or formal option.",
        "Report to ICC: Reach out to the Internal Complaints Committee.",
        "Ask for Interim Relief: Request leave, transfer, etc.",
        "Use Legal Appeals: If unsatisfied, take legal route."
      ]),
      ...formatSectionAsList("Complaint Process (Stages)", [
        "Complaint Submission: File with ICC.",
        "Acknowledgement: ICC confirms receipt.",
        "Resolution Choice: Informal/formal path.",
        "Investigation: Full inquiry begins.",
        "Report: ICC recommends actions.",
        "Appeal: Both sides can appeal."
      ])
    ]
  },

  "dowry": {
    title: "Dowry Prohibition Act, 1961",
    pdfUrl: "https://ncw.nic.in/sites/default/files/Dowry-Prohibition-Act-1961.pdf",
    rights: formatSectionAsList("Rights", [
      "Right to live free from dowry demands: It is illegal for anyone to demand, give, or take dowry. ",
      "Right to legal protection if harassed for dowry before, during, or after marriage.",
      "Right to claim streedhan (a woman’s rightful property, gifts, and belongings given during marriage).",
  
   " SECTION 498A IPC – CRUELTY BY HUSBAND OR RELATIVES", 
        "Right to protection against cruelty (mental or physical) by husband or his relatives.",
        "Right to seek legal action and protection orders against abusive in-laws.",
        "Right to maintenance and shelter during or after filing the case.",
        "Right to custody of children (case-specific).",
      ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "File a complaint with the police under the Dowry Prohibition Act.",
      "Approach the Dowry Prohibition Officer in your district.",
      "Lodge an FIR under Section 3 & 4 of the Dowry Act.Section 3: Punishes giving/taking of dowry (5 years + ₹15,000 fine or equal to dowry amount).Section 4: Punishes demanding dowry (6 months – 2 years imprisonment + fine)",
   
      " SECTION 498A IPC – CRUELTY BY HUSBAND OR RELATIVES", 
        "File an FIR under Section 498A IPC in a police station.",
        "Get support through the Protection of Women from Domestic Violence Act (PWDVA), 2005 for immediate relief.",
      ]),
  },

  "domestic-violence": {
    title: "Protection of Women from Domestic Violence Act, 2005",
    pdfUrl: "https://ncw.nic.in/sites/default/files/Protection%20of%20Women%20from%20Domestic%20Violence%20Act%2C%202005.pdf",
    rights: formatSectionAsList("Rights", [
      "Right to Reside: Stay in shared household.",
      "Protection Orders: Stop abuse by court order.",
      "Monetary Relief: Claim maintenance and expenses.",
    ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "File Complaint with Protection Officer, police, or Magistrate.",
      "Seek immediate shelter and medical aid.",
      "Request an interim protection even before the court verdict.",
      "Get legal aid and representation.",
    ])
  },

  "divorce": {
    title: "Marriage & Divorce Rights",
    pdfUrl: "https://www.civilsdaily.com/wp-content/uploads/2020/09/Hindu-Marriage-Act-1955.pdf",
    rights: formatSectionAsList(" Rights Under the Hindu Marriage Act, 1955", [
      "Right to Divorce: Women can seek divorce on grounds like cruelty, desertion, adultery, or mutual consent.",
      "Right to Maintenance: Under Section 25, a divorced woman can claim permanent alimony or maintenance.",
      "Custody of Children: Courts decide custody based on the child's welfare, allowing mothers to seek custody or visitation rights.",
      "Right to Remarry: Post-divorce, women have the legal right to remarry.",
      "Rights Under Section 125 CrPC",
      "Maintenance for Wife: A woman, unable to maintain herself, can claim maintenance from her husband, regardless of religion.",
     "Maintenance for Children: Mothers can claim maintenance for minor children or those unable to support themselves due to physical or mental conditions.",
      "Enforcement: Courts can enforce maintenance orders, and non-compliance can lead to legal consequences.",
    ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "File for Divorce: Approach the family court with a petition citing valid grounds under the Hindu Marriage Act.",
      "Seek Maintenance: File an application under Section 125 CrPC in the magistrate's court for maintenance.",
      "Document All Events.",
      "Child Custody: Petition the court for custody or visitation rights, emphasizing the child's best interests.",
    ])
  },

  "property": {
    title: "Women’s Inheritance & Property Rights",
    pdfUrl: "https://legislative.gov.in/sites/default/files/A1956-30.pdf",
    rights: formatSectionAsList("Rights", [
      "Equal Coparcenary Rights: Daughters have the same rights as sons in ancestral property, irrespective of their marital status.",
      "Right by Birth: Daughters become coparceners by birth, just like sons, and have equal rights in joint family property.",
      "Right to Demand Partition: Daughters can demand partition of ancestral property and claim their share.",
      "Liability: Along with rights, daughters also bear the same liabilities as sons in the joint family property.",
      "Applicability: These rights apply to all daughters born before or after the 2005 amendment.",
    ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "Legal Consultation: Consult a lawyer specializing in property law to understand your rights and the process.",
      "File a Partition Suit: If denied your rightful share, you can file a suit for partition in the appropriate civil court.",
      "Mediation: Consider mediation for an amicable settlement with family members regarding property division.",
         "Documentation: Gather all necessary documents, such as property records, family tree, and legal heir certificates.",
     "Stay Informed: Keep abreast of any further legal developments or judgments related to inheritance rights.",
    ])
  },

  "marital-rights": {
    title: "Marital Rights & Consent",
    pdfUrl: "https://indiankanoon.org/doc/312252/",
    rights: formatSectionAsList("While marital rape is not a criminal offense under the Indian Penal Code, the PWDVA provides civil remedies for women facing sexual abuse within marriage.", [
      "Right to Say No: Consent is necessary.",
      "Right to Live with Dignity.",
      "Legal Remedies for Abuse.",
    ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "Report to Women’s Cell.",
      "Apply for Protection Order.",
      "Seek Legal Counseling.",
    ])
  },

  "acid-attacks": {
    title: "Acid Attack Prevention & Compensation",
    pdfUrl: "https://www.mha.gov.in/sites/default/files/AdvisoryAcidAttackVictims_100713.pdf",
    rights: formatSectionAsList("Section 326A IPC – Acid Attack", [
      "Offense: Causing grievous hurt by acid attack.",
      "Punishment: Minimum 10 years imprisonment, extendable to life imprisonment, along with a fine. The fine should be just and reasonable to meet the medical expenses of the victim, and it shall be paid to the victim.",
    
    " Section 326B IPC – Attempt to Acid Attack", 
      "Offense: Attempting to throw or administer acid.",
    "Punishment: Minimum 5 years imprisonment, which may extend to 7 years, along with a fine.",
    "⚖️ Supreme Court Directives in Laxmi v. Union of India (2013)",
     "Regulation of Acid Sale: Acid cannot be sold to individuals below 18 years of age. Buyers must provide a photo ID and specify the reason for purchase. Sellers are required to maintain a register of sales and report them to the police.",
     "Free Medical Treatment: Both public and private hospitals must provide free medical treatment to acid attack victims, including reconstructive surgeries.",
      "Compensation for Victims: A minimum compensation of ₹3 lakhs is to be provided to acid attack victims by the concerned State Governments.",
      "Rehabilitation Measures: States are directed to provide social integration programs, including counseling, vocational training, and employment opportunities for acid attack survivors.",
     "Monitoring Mechanism: States must set up a mechanism to monitor the implementation of these guidelines and submit compliance reports.",
  ]),

    actions: formatSectionAsList("Actions You Can Take", [
      "File Immediate FIR.",
      "Approach Legal Aid Centers.",
      "Apply for Government Compensation.",
    ])
  },

  "economic-abuse": {
    title: "Protection Against Economic Abuse",
    pdfUrl: "https://www.clraindia.org/admin/gallery/documents/03032016125013-0CLRADVA2005hbfinal.pdf",
    rights: formatSectionAsList("PWDVA 2005 – Recognizes economic abuse as a form of domestic violence", [
      "Right to Financial Independence.",
      "Protection Against Withholding Money.",
      "Maintenance Rights.",
    ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "File a Complaint: Approach the Protection Officer, police station, or Magistrate's court to report instances of economic abuse.",
"Seek Monetary Relief: Under Section 20 of the PWDVA, request the Magistrate to direct the respondent to pay monetary relief to meet expenses incurred and losses suffered due to economic abuse.",
"Apply for Residence Orders: If deprived of your shared household, seek a residence order under Section 19 to secure your right to reside in the shared household.",
"Request Protection Orders: To prevent further abuse, apply for protection orders under Section 18, restraining the respondent from committing any act of domestic violence.",
"Access Legal Aid: Utilize free legal services provided under the Legal Services Authorities Act, 1987, to assist in legal proceedings.",
    ])
  },

  "street-harassment": {
    title: "Street Harassment & Eve-Teasing Laws",
    pdfUrl: "https://indiankanoon.org/doc/1803949/",
    rights: formatSectionAsList("Section 354 IPC – Assault or Criminal Force to Woman with Intent to Outrage Her Modesty", [
      "Offense: Assaulting or using criminal force against a woman with the intention of outraging her modesty.",
      "Punishment: Imprisonment of 1 to 5 years and a fine.",
     "Nature: Cognizable and non-bailable offense.",
    
    " Section 509 IPC – Word, Gesture, or Act Intended to Insult the Modesty of a Woman", 
        "Offense: Uttering any word, making any sound or gesture, or exhibiting any object intending to insult the modesty of a woman.",
        "Punishment: Simple imprisonment for up to 3 years and a fine",
        "Nature: Cognizable and bailable offense.",
     
     "Section 294 IPC – Obscene Acts and Songs", 
        "Offense: Performing any obscene act in a public place or singing, reciting, or uttering any obscene song, ballad, or words in or near any public place to the annoyance of others.",
        "Punishment: Imprisonment for up to 3 months, a fine, or both",
        "Nature: Non-cognizable and bailable offense.",
      ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "Report to Police.",
      "Call Women Helpline 1091.",
      "Use Legal Evidence (CCTV etc.).",
    ])
  },

  "cyber-crimes": {
    title: "Cyber Crime Laws for Women",
    pdfUrl: "https://cybercrime.gov.in/Webform/Crime_SectionList.aspx",
    rights: formatSectionAsList("Information Technology (IT) Act, 2000", [
      "Section 66E: Punishes violation of privacy by capturing, publishing, or transmitting images of a person's private areas without consent.Penalty: Up to 3 years imprisonment and/or fine up to ₹2 lakh.",
      "Section 67: Deals with publishing or transmitting obscene material in electronic form.Penalty: First conviction—up to 3 years imprisonment and/or fine up to ₹5 lakh; subsequent convictions—up to 5 years and/or fine up to ₹10 lakh.",
      "Section 67A: Pertains to publishing or transmitting material containing sexually explicit acts.Penalty: First conviction—up to 5 years imprisonment and/or fine up to ₹10 lakh; subsequent convictions—up to 7 years and/or fine up to ₹10 lakh.",

      "📜 Indian Penal Code (IPC)",
      "Section 354D: Addresses stalking, including cyberstalking.Penalty: First conviction—up to 3 years imprisonment and/or fine; subsequent convictions—up to 5 years and/or fine.",
      "Section 509: Punishes acts intended to insult the modesty of a woman, including sending lewd messages.Penalty: Up to 3 years imprisonment and/or fine.",
      "Section 499: Defines defamation, which can include online defamation.Penalty: Up to 2 years imprisonment and/or fine.",
     
    ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "File Complaint on Cybercrime Portal.",
      "Save all digital evidence like screenshots, messages, and URLs.",
      "Consult a cyber law expert for legal advice.",
      "Reach out to your city’s cybercrime cell for investigation support.",
    ])
  },

  "child-marriage": {
    title: "Child Marriage Prohibition Act",
    pdfUrl: "https://wcd.nic.in/sites/default/files/childprotection31072012.pdf",
    rights: formatSectionAsList("Rights", [
    "Voidable Marriage: A child marriage is voidable at the option of the contracting party who was a child at the time of marriage.",
    "Maintenance and Residence: The female contracting party is entitled to maintenance and residence until her remarriage.",
    "Custody of Children: Courts can issue appropriate orders regarding the custody and maintenance of children born from child marriages.",
    "Legitimacy of Children: Children born from child marriages are considered legitimate.",
    "Appointment of Prohibition Officers: The Act mandates the appointment of Child Marriage Prohibition Officers to prevent and prosecute child marriages.",
    "Punishment for Guardians & Offenders.",
    ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "Report to Police or Childline 1098.",
      "Request Protection & Shelter.",
      "File FIR Under Prohibition Act.",
    ])
  },

  "honour-crimes": {
    title: "Protection from Honour-Based Crimes",
    pdfUrl: "https://www.scconline.com/blog/post/2023/01/23/honour-killing/",
    rights: formatSectionAsList("Rights", [
      "Protection of Right to Choose Partner.",
      "Safety from Family-Based Threats.",
      "Legal Support for Inter-caste Marriage.",
    ]),
    actions: formatSectionAsList("Actions You Can Take", [
      "File Police Complaint.",
      "Request Safe House Relocation.",
      "Approach Human Rights Commission.",
    ])
  },
};

// Dynamic route for each law
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  const law = lawData[category];

  if (!law) {
    return res.status(404).json({ error: 'Invalid category' });
  }

  try {
    // Update or insert into database
    await Law.updateOne(
      { category },
      {
        $set: {
          title: law.title,
          rights: law.rights,
          actions: law.actions,
        }
      },
      { upsert: true }
    );

    res.json({
      title: law.title,
      rights: law.rights,
      actions: law.actions,
      pdfUrl: law.pdfUrl,
      cached: false,
    });

  } catch (err) {
    console.error('❌ Failed to process category:', category, err);
    res.status(500).json({ error: 'Server error while fetching law info' });
  }
});

module.exports = router;
