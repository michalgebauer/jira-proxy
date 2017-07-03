package com.mi3o.velocitytest;

import com.mi3o.velocitytest.com.mi3o.velocity.model.Person;
import com.mi3o.velocitytest.com.mi3o.velocity.model.Ponozky;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;

import java.io.File;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by michal.gebauer on 6/28/2017.
 */
public class Velocity {
    public static void main(String[] args) {
        Velocity velocity = new Velocity();
        velocity.test();
    }

    private void test() {
        VelocityEngine ve = new VelocityEngine();

        ve.setProperty("resource.loader", "class");
        ve.setProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
        ve.init();

        Template t = ve.getTemplate("template2.vm");

        VelocityContext vc = new VelocityContext();
        vc.put("title", "My Page");
        vc.put("ponozky", new Ponozky(43, "Modra", 10));
//        vc.put("name", "Miso");
//        vc.put("person", new Person("Ferko", "Mrkvicka", 25));
//
        Map<String, String> map = new HashMap<String, String>();
        map.put("Car", "Skoda");
        map.put("Home", "Flat");
        map.put("Watch", "Z trznice");

        vc.put("property", map);
        vc.put("user", "Miso");

        List<Ponozky> ponozkyList = new ArrayList<Ponozky>();
        ponozkyList.add(new Ponozky(10, "asdsa", 4324));
        ponozkyList.add(new Ponozky(11, "fds", 4324354));
        ponozkyList.add(new Ponozky(12, "sdfs", 4354324));
        ponozkyList.add(new Ponozky(15, "asfdsfdsdsa", 4324534));

        vc.put("pList", ponozkyList);

        StringWriter sw = new StringWriter();
        t.merge(vc, sw);

        System.out.println(sw);
    }
}
