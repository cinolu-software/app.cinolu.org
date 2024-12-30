import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { useAppSelector } from '@/Redux/Hooks';
import {TabPane} from "reactstrap";

const styles = StyleSheet.create({
    viewer: {
        width: '100%',
        height: '90vh',
    },
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    text: {
        marginBottom: 4,
        lineHeight: 1.4,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    list: {
        marginLeft: 10,
    },
    listItem: {
        marginBottom: 4,
    },
});

const ProgramPDF = ({ programData }: { programData: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {programData.image && (
                <View style={styles.section}>
                    <Image
                        style={styles.image}
                        src={`http://localhost:8000/uploads/programs/${programData.image}`}
                    />
                </View>
            )}


            <View style={styles.section}>
                <Text style={styles.title}>{programData.name}</Text>
                <Text style={styles.text}>{programData.description}</Text>
                <Text style={styles.text}>
                    <Text style={styles.subtitle}>Ville :</Text> {programData.town}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.subtitle}>Dates :</Text> {programData.started_at} - {programData.ended_at}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Objectifs</Text>
                <Text style={styles.text}>{programData.aim}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subtitle}>Public Cible</Text>
                <Text style={styles.text}>{programData.targeted_audience}</Text>
            </View>

            {programData.prize && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Récompense</Text>
                    <Text style={styles.text}>{programData.prize}</Text>
                </View>
            )}

            {programData.types?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Types</Text>
                    <View style={styles.list}>
                        {programData.types.map((type: any) => (
                            <Text key={type.id} style={styles.listItem}>
                                - {type.name}: {type.description}
                            </Text>
                        ))}
                    </View>
                </View>
            )}


            {programData.phases?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Phases</Text>
                    <View style={styles.list}>
                        {programData.phases.map((phase: any) => (
                            <Text key={phase.id} style={styles.listItem}>
                                - {phase.name}: {phase.description} ({phase.started_at} - {phase.ended_at})
                            </Text>
                        ))}
                    </View>
                </View>
            )}

            {programData.partners?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Partenaires</Text>
                    <View style={styles.list}>
                        {programData.partners.map((partner: any) => (
                            <View key={partner.id} style={{ marginBottom: 10 }}>
                                <Text style={styles.text}>
                                    <Text style={{ fontWeight: 'bold' }}>{partner.name}</Text>: {partner.description}
                                </Text>
                                {partner.website_link && (
                                    <Text style={styles.text}>Site Web : {partner.website_link}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {programData.categories?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Catégories</Text>
                    <View style={styles.list}>
                        {programData.categories.map((category: any) => (
                            <Text key={category.id} style={styles.listItem}>
                                - {category.name}
                            </Text>
                        ))}
                    </View>
                </View>
            )}
        </Page>
    </Document>
);

const ProgramRapportViewer = () => {
    const { programData } = useAppSelector((state) => state.programs);

    return (
        <TabPane tabId={'3'}>
            <PDFViewer style={styles.viewer}>
                <ProgramPDF programData={programData} />
            </PDFViewer>
        </TabPane>
    );
};

export default ProgramRapportViewer;


