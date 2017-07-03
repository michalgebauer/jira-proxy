package com.mi3o.velocitytest.com.mi3o.velocity.model;

/**
 * Created by michal.gebauer on 6/30/2017.
 */
public class Ponozky {
    private int velkost;
    private String farba;
    private int pocet;

    public Ponozky(int velkost, String farba, int pocet) {
        this.velkost = velkost;
        this.farba = farba;
        this.pocet = pocet;
    }

    public int getVelkost() {
        return velkost;
    }

    public void setVelkost(int velkost) {
        this.velkost = velkost;
    }

    public String getFarba() {
        return farba;
    }

    public void setFarba(String farba) {
        this.farba = farba;
    }

    public int getPocet() {
        return pocet;
    }

    public void setPocet(int pocet) {
        this.pocet = pocet;
    }
}
