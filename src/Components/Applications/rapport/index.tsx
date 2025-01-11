import React, { useEffect } from 'react';
import { Container, Card } from "reactstrap";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { Document, Page, View, StyleSheet, PDFViewer, Image, Text } from '@react-pdf/renderer';
import { ImagePath } from "@/Constant";
import { fetchCategory } from "@/Redux/Reducers/projectSlice/ProjectCategory";
import {fetchProjectType} from "@/Redux/Reducers/projectSlice/projectTypeSlice";
import {fetchProjects} from "@/Redux/Reducers/projectSlice/projectSlice";

const styles = StyleSheet.create({
    viewer: {
        width: '100%',
        height: '90vh',
    },
    container: {
        marginLeft: 30,
    },
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 30,
    },
    headerTextItem: {
        fontSize: 10,
        marginBottom: 2,
        marginLeft: 35,
    },
    imageLogo: {
        width: 50,
        height: 50,
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    programTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 15,
        textTransform: 'capitalize',
        textDecoration: 'underline',
    },
    programItem: {
        marginLeft: 20,
        marginTop: 10,
    },
});

const MyDocument = ({ projectData, projectCategory, projectType }: { projectData: any, projectCategory: any, projectType: any }) => {
    const programsByType = projectType.map((type: any) => ({
        name: type.name,
        count: projectData.filter((program: any) =>
            program.types.some((projectType: any) => projectType.name === type.name)
        ).length,
        programs: projectData.filter((program: any) =>
            program.types.some((projectType: any) => projectType.name === type.name)
        ).map((program: any) => program.name),
    }));

    const programsByCategory = projectCategory.map((category: any) => ({
        name: category.name,
        count: projectData.filter((program: any) =>
            program.categories.some((projectCategory: any) => projectCategory.name === category.name)
        ).length,
        programs: projectData.filter((program: any) =>
            program.categories.some((projectCategory: any) => projectCategory.name === category.name)
        ).map((program: any) => program.name),
    }));

    const totalPrograms = projectData.length;
    const totalCategory = projectCategory.length;
    const totalType = projectType.length;

    const stylesWithTable = StyleSheet.create({
        ...styles,
        table: {
            display: 'flex',
            width: 'auto',
            marginVertical: 10,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#000',
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableCellHeader: {
            flex: 1,
            borderStyle: 'solid',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: '#000',
            padding: 8,
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#84a02f',
            color: '#fff',
            fontSize: 12,
        },
        tableCell: {
            flex: 1,
            borderStyle: 'solid',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: '#000',
            padding: 5,
            textAlign: 'center',
        },
        lastCell: {
            borderRightWidth: 0,
        },
    });

    return (
        <Document>
            <Page size="A4" style={stylesWithTable.page}>
                <View style={stylesWithTable.container}>

                    <View style={stylesWithTable.header}>
                        <Image src={`${ImagePath}/logo/logo-g.png`} style={stylesWithTable.imageLogo} />
                        <View style={stylesWithTable.headerText}>
                            <Text style={stylesWithTable.headerTitle}>Centre d’Innovation de Lubumbashi</Text>
                            <Text style={stylesWithTable.headerTextItem}>Avenue des Usines, Makomeno</Text>
                            <Text style={stylesWithTable.headerTextItem}>221 Lubumbashi, Haut-Katanga RDC</Text>
                            <Text style={stylesWithTable.headerTextItem}>Site web: www.cinolu.org</Text>
                            <Text style={stylesWithTable.headerTextItem}>E-mail: compta@cinolu.org</Text>
                            <Text style={stylesWithTable.headerTextItem}>Tel: +243 993 320 803</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.mainTitle}>Rapport Annuel</Text>
                    </View>

                    <View>
                        <Text style={stylesWithTable.programTitle}>Résumé</Text>
                        <View style={stylesWithTable.table}>
                            <View style={stylesWithTable.tableRow}>
                                <Text style={[stylesWithTable.tableCellHeader, stylesWithTable.lastCell]}>Données</Text>
                                <Text style={stylesWithTable.tableCellHeader}>Valeur</Text>
                            </View>
                            <View style={stylesWithTable.tableRow}>
                                <Text style={[stylesWithTable.tableCell, stylesWithTable.lastCell]}>Nombre Total de Programmes</Text>
                                <Text style={stylesWithTable.tableCell}>{totalPrograms}</Text>
                            </View>
                            <View style={stylesWithTable.tableRow}>
                                <Text style={[stylesWithTable.tableCell, stylesWithTable.lastCell]}>Types de Programmes</Text>
                                <Text style={stylesWithTable.tableCell}>{totalType}</Text>
                            </View>
                            <View style={stylesWithTable.tableRow}>
                                <Text style={[stylesWithTable.tableCell, stylesWithTable.lastCell]}>Catégories de Programmes</Text>
                                <Text style={stylesWithTable.tableCell}>{totalCategory}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={stylesWithTable.programTitle}>Programmes Par Type</Text>
                        <View style={stylesWithTable.table}>
                            <View style={stylesWithTable.tableRow}>
                                <Text style={[stylesWithTable.tableCellHeader, stylesWithTable.lastCell]}>Type</Text>
                                <Text style={[stylesWithTable.tableCellHeader, stylesWithTable.lastCell]}>Nombre</Text>
                                <Text style={stylesWithTable.tableCellHeader}>Programmes</Text>
                            </View>
                            {programsByType.map((type: any, index: number) => (
                                <View style={stylesWithTable.tableRow} key={index}>
                                    <Text style={[stylesWithTable.tableCell, stylesWithTable.lastCell]}>{type.name}</Text>
                                    <Text style={[stylesWithTable.tableCell, stylesWithTable.lastCell]}>{type.count}</Text>
                                    <Text style={stylesWithTable.tableCell}>{type.programs.join(', ')}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text style={stylesWithTable.programTitle}>Programmes Par Catégorie</Text>
                        <View style={stylesWithTable.table}>
                            <View style={stylesWithTable.tableRow}>
                                <Text style={[stylesWithTable.tableCellHeader, stylesWithTable.lastCell]}>Catégorie</Text>
                                <Text style={[stylesWithTable.tableCellHeader, stylesWithTable.lastCell]}>Nombre</Text>
                                <Text style={stylesWithTable.tableCellHeader}>Programmes</Text>
                            </View>
                            {programsByCategory.map((category: any, index: number) => (
                                <View style={stylesWithTable.tableRow} key={index}>
                                    <Text style={[stylesWithTable.tableCell, stylesWithTable.lastCell]}>{category.name}</Text>
                                    <Text style={[stylesWithTable.tableCell, stylesWithTable.lastCell]}>{category.count}</Text>
                                    <Text style={stylesWithTable.tableCell}>{category.programs.join(', ')}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};





const Rapport = () => {
    const { originalProjectData, status } = useAppSelector(state => state.project);
    const { projectCategoryData } = useAppSelector(state => state.projectCategory);
    const { originalTypeProjectData } = useAppSelector(state => state.projectType);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProjects());
        }
        dispatch(fetchCategory());
        dispatch(fetchProjectType());
    }, [status, dispatch]);

    return (
        <Container fluid>
            <Card>
                <PDFViewer style={styles.viewer}>
                    <MyDocument
                        projectData={originalProjectData}
                        projectCategory={projectCategoryData}
                        projectType={originalTypeProjectData}
                    />
                </PDFViewer>
            </Card>
        </Container>
    );
};

export default Rapport;
